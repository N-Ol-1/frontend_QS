import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewAssessment = ({ map }) => {
    const [curricularUnits, setCurricularUnits] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState('');
    const [assessmentClassifications, setAssessmentClassifications] = useState([]);
    const [assessments, setAssessments] = useState([]);

    useEffect(() => {
        // Fetch curricular units for the degree and semester
        axios.get(`http://localhost:8080/api/v1/curricularUnits`, {
            params: {
                degreeId: map.degree.id,
                semesterId: map.semester.id,
            },
        })
        .then((response) => setCurricularUnits(response.data))
        .catch((error) => console.error('Error fetching curricular units:', error));

        // Fetch assessment classifications
        axios.get(`http://localhost:8080/api/v1/assessmentClassifications`)
            .then((response) => setAssessmentClassifications(response.data))
            .catch((error) => console.error('Error fetching assessment classifications:', error));
    }, [map]);

    const initializeAssessments = (unitId) => {
        // Initialize 4 possible assessments for the selected curricular unit
        const initialAssessments = Array.from({ length: 4 }, (_, index) => ({
            curricularUnitId: unitId,
            classification: '',
            weight: '',
            date: '',
            time: '',
            classroom: '',
        }));
        setAssessments(initialAssessments);
    };

    const handleInputChange = (index, field, value) => {
        const updatedAssessments = [...assessments];
        updatedAssessments[index][field] = value;
        setAssessments(updatedAssessments);
    };

    const handleSubmit = () => {
        const validAssessments = assessments.filter(
            (a) => a.classification && a.weight && a.date && a.time && a.classroom
        );

        if (validAssessments.length < 2) {
            alert('Each curricular unit must have at least 2 valid assessments.');
            return;
        }

        axios.post('http://localhost:8080/api/v1/assessments', validAssessments)
            .then(() => alert('Assessments added successfully!'))
            .catch((error) => console.error('Error adding assessments:', error));
    };

    return (
        <div>
            <h2>Add Assessments to Map</h2>
            <div>
                <label>Curricular Unit:</label>
                <select
                    onChange={(e) => {
                        setSelectedUnit(e.target.value);
                        initializeAssessments(e.target.value);
                    }}
                >
                    <option value="">Select Curricular Unit</option>
                    {curricularUnits.map((unit) => (
                        <option key={unit.id} value={unit.id}>{unit.description}</option>
                    ))}
                </select>
            </div>
            {selectedUnit && (
                <div>
                    <h3>Assessments for {curricularUnits.find(u => u.id === parseInt(selectedUnit))?.description}</h3>
                    {assessments.map((assessment, index) => (
                        <div key={index} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                            <h4>Assessment {index + 1}</h4>
                            <div>
                                <label>Classification:</label>
                                <select
                                    value={assessment.classification}
                                    onChange={(e) => handleInputChange(index, 'classification', e.target.value)}
                                >
                                    <option value="">Select Classification</option>
                                    {assessmentClassifications.map((classification) => (
                                        <option key={classification.id} value={classification.id}>
                                            {classification.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Weight (%):</label>
                                <input
                                    type="number"
                                    value={assessment.weight}
                                    onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Date:</label>
                                <input
                                    type="date"
                                    value={assessment.date}
                                    onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Time (00h00):</label>
                                <input
                                    type="time"
                                    value={assessment.time}
                                    onChange={(e) => handleInputChange(index, 'time', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Classroom:</label>
                                <input
                                    type="text"
                                    value={assessment.classroom}
                                    onChange={(e) => handleInputChange(index, 'classroom', e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <button onClick={handleSubmit}>Submit Assessments</button>
        </div>
    );
};

export default NewAssessment;
