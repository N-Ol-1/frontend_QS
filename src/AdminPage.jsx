import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AdminPage = () => {

  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    semester1: { initialDate: '', endDate: '' },
    semester2: { initialDate: '', endDate: '' },
    EpocaNormal: { initialDate: '', endDate: '' },
    EpocaRecurso: { initialDate: '', endDate: '' },
    EpocaEspecial: { initialDate: '', endDate: '' },
  });

  const handleInputChange = (e, formKey) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [formKey]: {
        ...prev[formKey],
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (formKey, endpoint, id) => {
    const payload = {
      initialDate: formValues[formKey].initialDate,
      endDate: formValues[formKey].endDate,
    };

    try {
      const response = await axios.put(`http://localhost:8080${endpoint}/${id}`, payload);
      alert(`Sucesso: ${response.data.description} alterado.`);
    } catch (error) {
      alert(`Erro ao atualizar ${formKey}: ${error.response?.data?.message || error.message}`);
    }
  };


  return (
    <div className="p-8 bg-gray-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center"> UPT Admin</h1>
      <div className="grid grid-cols-5 gap-6">
        {/* Semester 1 */}
        <div className="p-4 bg-white shadow rounded ">
          <h2 className="text-lg font-semibold mb-4">1º semestre</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit('semester1', '/api/v1/semesters', 1);
            }}
          >
            <div className="mb-4">
              <label className="block mb-2">Inicio:</label>
              <input
                type="date"
                name="initialDate"
                value={formValues.semester1.initialDate}
                onChange={(e) => handleInputChange(e, 'semester1')}
                className="border px-3 py-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Fim:</label>
              <input
                type="date"
                name="endDate"
                value={formValues.semester1.endDate}
                onChange={(e) => handleInputChange(e, 'semester1')}
                className="border px-3 py-2 rounded w-full"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Submit
            </button>
          </form>
        </div>

        {/* Semester 2 */}
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-semibold mb-4">2º Semestre</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit('semester2', '/api/v1/semesters', 2);
            }}
          >
            <div className="mb-4">
              <label className="block mb-2">Inicio:</label>
              <input
                type="date"
                name="initialDate"
                value={formValues.semester2.initialDate}
                onChange={(e) => handleInputChange(e, 'semester2')}
                className="border px-3 py-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Fim:</label>
              <input
                type="date"
                name="endDate"
                value={formValues.semester2.endDate}
                onChange={(e) => handleInputChange(e, 'semester2')}
                className="border px-3 py-2 rounded w-full"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Submit
            </button>
          </form>
        </div>

        {/* Period Forms */}
        {[
          { label: 'Época Normal', formKey: 'EpocaNormal', id: 1 },
          { label: 'Época Recurso', formKey: 'EpocaRecurso', id: 2 },
          { label: 'Época Especial', formKey: 'EpocaEspecial', id: 3 },
        ].map(({ label, formKey, id }) => (
          <div key={id} className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold mb-4">{label}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(formKey, '/api/v1/periods', id);
              }}
            >
              <div className="mb-4">
                <label className="block mb-2">Inicio:</label>
                <input
                  type="date"
                  name="initialDate"
                  value={formValues[formKey].initialDate}
                  onChange={(e) => handleInputChange(e, formKey)}
                  className="border px-3 py-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Fim:</label>
                <input
                  type="date"
                  name="endDate"
                  value={formValues[formKey].endDate}
                  onChange={(e) => handleInputChange(e, formKey)}
                  className="border px-3 py-2 rounded w-full"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Submeter
              </button>
            </form>
          </div>
        ))}
        <button
            className="mt-4 w-48 bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            onClick={() => navigate('/')}
        >
            Sair
        </button>
      </div>
  </div>
);
};