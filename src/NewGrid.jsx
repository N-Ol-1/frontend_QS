import React, { useState, useEffect } from 'react';

export const NewGrid = ({ map }) => {
  const [fetchedMap, setFetchedMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper functions for formatting
  const formatDateForDisplay = (isoDate) => {
    if (!isoDate) return '';
    const [year, month, day] = isoDate.split('-');
    return `${day}-${month}-${year}`;
  };

  const formatTimeForDisplay = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    return `${hours}h${minutes}m`;
  };


  useEffect(() => {
    if (map && map.id) {
      const fetchMapData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/v1/maps/${map.id}`);

          if (!response.ok) {
            throw new Error('Failed to fetch map data');
          }

          const data = await response.json();
          console.log("Fetched Map Data:", data); // Log data for debugging
          setFetchedMap(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchMapData();
    } else {
      setLoading(false);
      setError('Invalid map data');
    }
  }, [map]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!fetchedMap) {
    return <div>No map data found</div>;
  }

  // Group assessments by year
  const groupedUnits = fetchedMap.assessments.reduce((acc, assessment) => {
    const unit = assessment.curricularUnit;
    const year = unit.year;

    if (year) {
      if (!acc[year]) {
        acc[year] = {};
      }
      if (!acc[year][unit.id]) {
        acc[year][unit.id] = {
          unit,
          assessments: [],
        };
      }
      acc[year][unit.id].assessments.push(assessment);
    }
    return acc;
  }, {});

const renderYearGrid = (year, units) => {
  const unitCount = Object.keys(units).length;  // Count the number of units for the year
  const rowSpanValue = unitCount;
  return (
    <React.Fragment key={year}>
      <div className="col-span-25 bg-slate-400 text-center flex items-center justify-center" style={{ gridRow: `span ${rowSpanValue}` }}>
        {year}º ano
      </div>

      {Object.values(units).map(({ unit, assessments }) => (
        <React.Fragment key={unit.id}>
          <div className="h-16 border border-gray-300 col-span-3 text-center w-full bg-slate-100 flex items-center justify-center text-xs">
            {unit.description}
          </div>
          <div className="h-16 border border-gray-300 col-span-1 text-center w-full bg-slate-100 flex items-center justify-center text-xs">
            {unit.assessmentType.description}
          </div>

          {assessments.map((assessment) => (
            <React.Fragment key={assessment.id}>
              <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16 text-xs">
                {assessment.assessmentClassification.description}
              </div>
              <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16 text-xs">
                {assessment.weight}%
              </div>
              <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16 text-xs">
                {formatDateForDisplay(assessment.date)}
              </div>
              <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16 text-xs">
                {formatTimeForDisplay(assessment.time)}
              </div>
              <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16 text-xs">
                {assessment.classroom}
              </div>
            </React.Fragment>
          ))}

          {/* Placeholder elements */}
          {assessments.length < 4 &&
            Array.from({ length: 4 - assessments.length }).map((_, index) => (
              <React.Fragment key={`placeholder-${unit.id}-${index}`}>
                <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16"></div>
                <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16"></div>
                <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16"></div>
                <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16"></div>
                <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16"></div>
              </React.Fragment>
            ))}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};



  return (
    <div className="grid grid-cols-25 gap-1 w-full mt-24 text-center">
      {/* Header */}

      <div className="h-16 rounded-sm w-full bg-slate-300 col-span-5 flex items-center justify-center"></div>
      <div className="h-16 rounded-sm w-full bg-slate-300 col-span-5 flex items-center justify-center">
        1º elemento avaliação
      </div>
      <div className="h-16 rounded-sm w-full bg-slate-300 col-span-5 flex items-center justify-center">
        2º elemento avaliação
      </div>
      <div className="h-16 rounded-sm w-full bg-slate-300 col-span-5 flex items-center justify-center">
        3º elemento avaliação
      </div>
      <div className="h-16 rounded-sm w-full bg-slate-300 col-span-5 flex items-center justify-center">
        4º elemento avaliação
      </div>
      <div className="h-16 rounded-sm w-full bg-slate-300 col-span-1 flex items-center justify-center"></div>
      <div className='h-18 text-center w-full bg-slate-400 col-span-3 flex items-center justify-center'>Unidade Curricular</div>
      <div className='h-18 text-center w-full bg-slate-400 col-span-1 flex items-center justify-center text-xs'>Tipo avaliação</div>
      <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Elemento</div>
      <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Ponderação</div>
      <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Data</div>
      <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Hora</div>
      <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Sala</div>
      <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Elemento</div>
      <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Ponderação</div>
      <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Data</div>
      <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Hora</div>
      <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Sala</div>
      <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Elemento</div>
      <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Ponderação</div>
      <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Data</div>
      <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Hora</div>
      <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Sala</div>
      <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Elemento</div>
      <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Ponderação</div>
      <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Data</div>
      <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Hora</div>
      <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Sala</div>

      {/* Year Grids */}
      {Object.entries(groupedUnits).map(([year, units]) => renderYearGrid(year, units))}
    </div>
  );
};
