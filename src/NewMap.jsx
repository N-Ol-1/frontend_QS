import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewAssessment from './NewAssessment';

const NewMap = () => {
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

    if (createdMap) {
        // Redirect to NewAssessment after creating the map
        return <NewAssessment map={createdMap} />;
    }

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
            console.log('Map posted successfully:', response.data);
            alert('Map created successfully!');
            setCreatedMap(response.data);
        } catch (error) {
            console.error('Error posting map:', error);
            alert('Failed to create map. Please try again.');
        }
    };


    return (
        <div>
            <h1>Novo Mapa</h1>
            <form onSubmit={handleSubmit}>
                {/* Lective Year Dropdown */}
                <div>
                    <label htmlFor="lectiveYear">Lective Year:</label>
                    <select
                        id="lectiveYear"
                        name="lectiveYear"
                        value={formData.lectiveYear}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Lective Year</option>
                        {lectiveYears.map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Semester Dropdown */}
                <div>
                    <label htmlFor="semester">Semester:</label>
                    <select
                        id="semester"
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Semester</option>
                        {semesters.map((semester) => (
                            <option key={semester.id} value={semester.name}>
                                {semester.description}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Period Dropdown */}
                <div>
                    <label htmlFor="period">Period:</label>
                    <select
                        id="period"
                        name="period"
                        value={formData.period}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Period</option>
                        {periods.map((period) => (
                            <option key={period.id} value={period.name}>
                                {period.description}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Degree Dropdown */}
                <div>
                    <label htmlFor="degree">Degree:</label>
                    <select
                        id="degree"
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Degree</option>
                        {degrees.map((degree) => (
                            <option key={degree.id} value={degree.name}>
                                {degree.description}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NewMap;
