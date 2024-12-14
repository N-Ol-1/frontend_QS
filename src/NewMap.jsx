import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewAssessment from './NewAssessment';

const NewMap = ({ onUpdate, setNewMapVisible, setNewAssessmentVisible }) => {
    const [formData, setFormData] = useState({
        lectiveYear: '',
        semester: '',
        period: '',
        degree: '',
    });

    const [semesters, setSemesters] = useState([]);
    const [periods, setPeriods] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [lectiveYears, setLectiveYears] = useState([]);
    const [createdMap, setCreatedMap] = useState(null); // Store created map details
    const [showAssessment, setShowAssessment] = useState(false); // Toggle to show NewAssessment

    // Fetch options from the API
    useEffect(() => {
        // Fetch Semesters
        axios.get('http://localhost:8080/api/v1/semesters')
            .then((response) => setSemesters(response.data))
            .catch((error) => console.error('Error fetching semesters:', error));

        // Fetch Periods
        axios.get('http://localhost:8080/api/v1/periods')
            .then((response) => setPeriods(response.data))
            .catch((error) => console.error('Error fetching periods:', error));

        // Fetch Degrees
        axios.get('http://localhost:8080/api/v1/degrees')
            .then((response) => setDegrees(response.data))
            .catch((error) => console.error('Error fetching degrees:', error));

        // Generate Lective Years
        const currentYear = new Date().getFullYear();
        const years = [`${currentYear}/${currentYear + 1}`, `${currentYear + 1}/${currentYear + 2}`];
        setLectiveYears(years);
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct the map object payload with only the required IDs
        const mapPayload = {
            lectiveyear: formData.lectiveYear, // Lective year selected by the user
            period: {
                id: periods.find(period => period.description  === formData.period)?.id || null, // Period ID
            },
            semester: {
                id: semesters.find(semester => semester.description  === formData.semester)?.id || null, // Semester ID
            },
            degree: {
                id: degrees.find(degree => degree.description  === formData.degree)?.id || null, // Degree ID
            },
        };
        console.log('Form Data:', mapPayload);
        try {
            const response = await axios.post('http://localhost:8080/api/v1/maps', mapPayload);
            alert('Map created successfully!');
            setCreatedMap(response.data);

            if (onUpdate) {
                onUpdate(); // Notify parent about the update
            }
            setShowAssessment(true); // Switch to NewAssessment
        } catch (error) {
            console.error('Error posting map:', error);
            alert('Failed to create map. Please try again.');
        }
    };

    if (showAssessment && createdMap) {
        // Render the NewAssessment component
        return <NewAssessment map={createdMap} setNewAssessmentVisible={setShowAssessment}/>;
    }

    return (
<div className="flex justify-center items-center h-screen ">
    <div className="w-96 p-6 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-semibold mb-6">Novo Mapa</h1>
        <form onSubmit={handleSubmit}>
            {/* Lective Year Dropdown */}
            <div className="mb-4">
                <label htmlFor="lectiveYear" className="block text-sm font-medium text-gray-700 mb-1">
                    Ano Letivo:
                </label>
                <select
                    id="lectiveYear"
                    name="lectiveYear"
                    value={formData.lectiveYear}
                    onChange={handleChange}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Selecionar ano letivo</option>
                    {lectiveYears.map((year, index) => (
                        <option key={index} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            {/* Semester Dropdown */}
            <div className="mb-4">
                <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">
                    Semestre:
                </label>
                <select
                    id="semester"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Selecionar Semestre</option>
                    {semesters.map((semester) => (
                        <option key={semester.id} value={semester.name}>
                            {semester.description}
                        </option>
                    ))}
                </select>
            </div>

            {/* Period Dropdown */}
            <div className="mb-4">
                <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-1">
                    Época:
                </label>
                <select
                    id="period"
                    name="period"
                    value={formData.period}
                    onChange={handleChange}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Selecionar época</option>
                    {periods.map((period) => (
                        <option key={period.id} value={period.name}>
                            {period.description}
                        </option>
                    ))}
                </select>
            </div>

            {/* Degree Dropdown */}
            <div className="mb-6">
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                    Curso:
                </label>
                <select
                    id="degree"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Selecionar curso</option>
                    {degrees.map((degree) => (
                        <option key={degree.id} value={degree.name}>
                            {degree.description}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-[#50aeea] hover:bg-[#20aeea] text-white font-medium py-2 px-4 rounded-md"
            >
                Criar Mapa
            </button>
            <button
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
              onClick={() => setNewMapVisible(false)} // Close the modal
            >
              Sair
            </button>
        </form>
    </div>
</div>

    );
};

export default NewMap;
