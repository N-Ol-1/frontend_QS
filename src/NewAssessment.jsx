import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewAssessment = ({ map }) => {
    const [curricularUnits, setCurricularUnits] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState('');
    const [assessmentClassifications, setAssessmentClassifications] = useState([]);
    const [assessments, setAssessments] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/curricularUnits`)
            .then((response) => {
                const allUnits = response.data;
                console.log("Curricular Units:", allUnits);

                // Filter units by degreeId and semesterId
                const filteredUnits = allUnits.filter(
                    (unit) =>
                        unit.degree.id === map.degree.id &&
                        unit.semester.id === map.semester.id
                );
                setCurricularUnits(filteredUnits);
            })
            .catch((error) => console.error('Error fetching curricular units:', error));

        // Fetch assessment classifications
        axios.get(`http://localhost:8080/api/v1/assessmentClassifications`)
            .then((response) => {
                setAssessmentClassifications(response.data);
            })
            .catch((error) => console.error('Error fetching assessment classifications:', error));
    }, [map]);

    const initializeAssessments = (unitId) => {
        const initialAssessments = Array.from({ length: 4 }, () => ({
            curricularUnit: unitId, // Directly store unitId here
            assessmentClassification: '', // Default empty
            weight: '',
            date: '',
            time: '',
            classroom: '',
            mapId: map.id,
        }));
        setAssessments(initialAssessments);
    };

    const handleInputChange = (index, field, value) => {
        const updatedAssessments = [...assessments];
        updatedAssessments[index][field] =
            field === 'assessmentClassification' || field === 'curricularUnit'
                ? parseInt(value, 10) || '' // Parse integer and fallback to ''
                : value;
        setAssessments(updatedAssessments);
        console.log('Updated Assessments:', updatedAssessments);
    };

    const handleSubmit = () => {
        console.log('Assessments before submission:', assessments);

        // Filter valid assessments
        const validAssessments = assessments.filter(
            (a) =>
                a.assessmentClassification &&
                !isNaN(parseInt(a.assessmentClassification, 10)) &&
                a.weight &&
                !isNaN(parseFloat(a.weight)) &&
                a.date &&
                a.time &&
                a.classroom
        );

        if (validAssessments.length < 2) {
            alert('Each curricular unit must have at least 2 valid assessments.');
            return;
        }

        // Transform assessments into the API's expected format
        const payloads = validAssessments.map((assessment) => ({
            curricularUnit: { id: assessment.curricularUnit }, // Already stored as number
            map: { id: map.id },
            assessmentClassification: { id: assessment.assessmentClassification }, // Already parsed
            weight: parseFloat(assessment.weight),
            date: assessment.date,
            time: assessment.time,
            classroom: assessment.classroom,
        }));

        console.log('Payloads:', payloads);

        // Post each valid assessment individually
        payloads.forEach((payload) => {
            axios.post('http://localhost:8080/api/v1/assessments', payload)
                .then(() => console.log('Assessment added successfully:', payload))
                .catch((error) => console.error('Error adding assessment:', payload, error));
        });

        alert('Avaliações adicionadas ao mapa!');
    };

    return (
        <div>
            <h2>Add Assessments to Map</h2>
            <div>
                <label>Curricular Unit:</label>
                <select
                    onChange={(e) => {
                        const selectedId = parseInt(e.target.value, 10); // Convert to integer
                        setSelectedUnit(selectedId);
                        initializeAssessments(selectedId);
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
                    <h3>Assessments for {curricularUnits.find(u => u.id === selectedUnit)?.description}</h3>
                    {assessments.map((assessment, index) => (
                        <div key={index} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                            <h4>Assessment {index + 1}</h4>
                            <div>
                                <label>Classification:</label>
                                <select
                                    value={assessment.assessmentClassification}
                                    onChange={(e) => handleInputChange(index, 'assessmentClassification', e.target.value)}
                                >
                                    <option value="">Select Classification</option>
                                    {assessmentClassifications.map((classification) => (
                                        <option key={classification.id} value={classification.id}>
                                            {classification.description}
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

