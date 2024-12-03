import React, { useState, useEffect } from 'react';
import { NewGrid } from './NewGrid';  // Import the named export

export const Sidebar = ({ isSidebarVisible, setSidebarVisible }) => {
  // States for managing dropdown visibility and degrees data
  const [degrees, setDegrees] = useState([]); // State to store degree data
  const [selectedMap, setSelectedMap] = useState(null); // Store selected map
  const [error, setError] = useState(false); // To handle errors if the API call fails

  // Fetch degrees data from the API
  useEffect(() => {
    const fetchDegrees = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/api/v1/degrees'); // API endpoint
        if (!response.ok) throw new Error('Failed to fetch degrees');
        const data = await response.json();
        console.log("Degrees Data: ", data);  // Log the data for inspection
        setDegrees(data); // Store the degree data
      } catch (error) {
        console.error('Error fetching degrees:', error);
        setError(true); // Handle error state
      }
    };

    fetchDegrees();
  }, []);

  // Function to toggle the visibility of evaluations for a specific degree
  const toggleMaps = (degreeId) => {
    setDegrees((prevDegrees) =>
      prevDegrees.map((degree) => {
        if (degree.id === degreeId) {
          // Log the toggle action
          console.log(`Toggling maps for degree ${degreeId}`);
          return { ...degree, isMapsVisible: !degree.isMapsVisible };
        }
        return degree;
      })
    );
  };

    // Handle when a map is clicked
    const handleMapClick = (map) => {
      setSelectedMap(map); // Set the selected map to state
      setSidebarMap(false); // Optionally close the sidebar after clicking
    };

  return (
    <div>
      {/* Sidebar */}
      {isSidebarVisible && (
        <div className="w-64 bg-white h-screen p-4 border-r absolute">
          <div className="grid grid-cols-2">
            <h2 className="text-xl font-semibold mb-4">Cursos</h2>
            <button
              className="text-3xl justify-self-end text-right"
              onClick={() => setSidebarVisible(false)}
            >
              x
            </button>
          </div>

          {/* Error Message */}
          {error && <div className="text-red-500 mb-4">Error fetching degrees. Please try again later.</div>}

          {/* Render Degrees from API */}
          {degrees.length > 0 ? (
            degrees.map((degree) => (
              <div key={degree.id} onClick={toggleMaps} className="cursor-pointer p-2 rounded-lg mb-2">

                {/* Degree description */}
                <div className="font-semibold" onClick={() => toggleMaps(degree.id)}>{degree.description}</div>

                {/* Evaluation Maps of Degree (Sub-options) */}
                {degree.isMapsVisible && degree.maps && (
                  <div className="ml-4 mt-2">
                    <ul className="pl-4">
                        {degree.maps.map((map, index) => (
                            <li
                               key={index}
                               className="text-gray-700 text-sm cursor-pointer"
                               onClick={() => handleMapClick(map)} // Handle map click
                            >
                            {map.lectiveyear} {map.semester.description} {map.period.description}
                            </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-500">Loading degrees...</div>
          )}
        </div>
      )}
    {/* Conditionally render the NewGrid component when an evaluation is selected */}
    {selectedMap && <NewGrid map={selectedMap} />}
    </div>
  );
};
