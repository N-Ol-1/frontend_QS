import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewAssessment = ({ map, setNewAssessmentVisible }) => {

    const [curricularUnits, setCurricularUnits] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState('');
    const [assessmentClassifications, setAssessmentClassifications] = useState([]);
    const [assessments, setAssessments] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/curricularUnits`)
            .then((response) => {
                const allUnits = response.data;

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

const handleSubmit = async () => {
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

    if (validAssessments.length === 0) {
        alert('No valid assessments found. Please fill in the details correctly.');
        return;
    }

    // Calculate the sum of weights
    const totalWeight = validAssessments.reduce((sum, a) => sum + parseFloat(a.weight), 0);

    if (totalWeight !== 100) {
        alert(`The total weight of the assessments must equal 100%. Current total: ${totalWeight}%.`);
        return;
    }

    // Fetch the selected curricular unit
    const selectedCurricularUnit = curricularUnits.find((unit) => unit.id === selectedUnit);

    if (!selectedCurricularUnit) {
        alert('Please select a valid curricular unit.');
        return;
    }

    const assessmentTypeId = selectedCurricularUnit.assessmentType?.id;

    // Validation logic for assessmentType.id === 1
    if (assessmentTypeId === 1) {
        if (validAssessments.length < 2) {
            alert('For assessment type 1, there must be at least 2 valid assessments.');
            return;
        }

        let mapPeriodDates;

        try {
            // Fetch the map period dates
            const mapPeriodResponse = await axios.get(
                `http://localhost:8080/api/v1/periods/${map.period.id}`
            );
            mapPeriodDates = mapPeriodResponse.data;
        } catch (error) {
            console.error('Error fetching map period data:', error);
            alert('Could not validate map period date ranges. Please try again.');
            return;
        }

        const isValidWithinMapPeriod =
            map.period.id === 1 &&
            validAssessments.some(
                (a) =>
                    new Date(a.date) >= new Date(mapPeriodDates.initialDate) &&
                    new Date(a.date) <= new Date(mapPeriodDates.endDate)
            );

        if (map.period.id === 1 && !isValidWithinMapPeriod) {
            alert(
                `Em cadeiras com avaliação mista, pelo menos uma avaliação deve ser na época de exames.
                Época de exames:
                Início: ${mapPeriodDates.initialDate}
                Fim: ${mapPeriodDates.endDate}`
            );
            return;
        }
    }

    // Prepare payloads
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
        axios
            .post('http://localhost:8080/api/v1/assessments', payload)
            .then(() => console.log('Assessment added successfully:', payload))
            .catch((error) => console.error('Error adding assessment:', payload, error));
    });

    alert('Avaliações adicionadas ao mapa!');
};

     const handleClose = () => {
        const confirmExit = window.confirm(
            'Já adicionou todas as avaliações ao mapa?\nClique em "OK" para sair ou "Cancelar" para continuar.'
        );
        console.log('confirmExit:', confirmExit);
        if (confirmExit) {
            setNewAssessmentVisible(false);
        }
    };

    return (
<div className="w-full p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-6">Adicionar Avaliações ao Mapa</h2>

    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Unidade Curricular:</label>
        <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg"
            onChange={(e) => {
                const selectedId = parseInt(e.target.value, 10); // Convert to integer
                setSelectedUnit(selectedId);
                initializeAssessments(selectedId);
            }}
        >
            <option value="">Selecionar Unidade Curricular</option>
            {curricularUnits.map((unit) => (
                <option key={unit.id} value={unit.id}>{unit.description}</option>
            ))}
        </select>
    </div>

    {selectedUnit && (
        <div>
            <h3 className="text-xl font-semibold mb-4">
                Avaliações para {curricularUnits.find(u => u.id === selectedUnit)?.description}
            </h3>

            {/* Flex container to align assessments horizontally */}
            <div className="flex flex-wrap gap-4 mb-4 justify-left">
                {assessments.map((assessment, index) => (
                    <div
                        key={index}
                        className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg border border-gray-300 rounded-lg p-4"
                        style={{ backgroundColor: '#f9fafb' }}
                    >
                        <h4 className="text-lg font-medium mb-2">Avaliação {index + 1}</h4>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo:</label>
                            <select
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={assessment.assessmentClassification}
                                onChange={(e) => handleInputChange(index, 'assessmentClassification', e.target.value)}
                            >
                                <option value="">Selecionar Classificação</option>
                                {assessmentClassifications.map((classification) => (
                                    <option key={classification.id} value={classification.id}>
                                        {classification.description}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ponderação (%):</label>
                            <input
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                type="number"
                                value={assessment.weight}
                                onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Data:</label>
                            <input
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                type="date"
                                value={assessment.date}
                                onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Hora:</label>
                            <input
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                type="time"
                                value={assessment.time}
                                onChange={(e) => handleInputChange(index, 'time', e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sala:</label>
                            <input
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                type="text"
                                value={assessment.classroom}
                                onChange={(e) => handleInputChange(index, 'classroom', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )}

    <button
        onClick={handleSubmit}
        className="w-full bg-[#50aeea] hover:bg-[#20aeea] text-white font-medium py-2 px-4 rounded-md mt-6 items-center max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg"
    >
        Adicionar Avaliações
    </button>
    <button
        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md mt-6 items-center max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg"
        onClick={handleClose}
    >
        Sair
    </button>
</div>


    );
};

export default NewAssessment;

