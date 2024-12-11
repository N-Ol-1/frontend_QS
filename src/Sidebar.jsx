import React, { useState, useEffect } from 'react';
import { NewGrid } from './NewGrid';  // Import the named export

export const Sidebar = ({ isSidebarVisible, setSidebarVisible, onMapSelect }) => {
  // States for managing dropdown visibility and degrees data
  const [degrees, setDegrees] = useState([]); // State to store degree data
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

   /*  // Handle when a map is clicked
    const handleMapClick = (map) => {
      setSelectedMap(map); // Set the selected map to state
      setSidebarMap(false); // Optionally close the sidebar after clicking
    }; */

  return (
        <div>
          {/* Sidebar */}
          {isSidebarVisible && (
            <div
                  className={`fixed top-20 left-0 h-full w-64 bg-[#fafafa] px-4 text-black transform ${
                    isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
                  } transition-transform duration-300 z-40`}
                >
              <div className="grid grid-cols-2">
                <h2 className="text-xl font-semibold mb-4">Escolher curso:</h2>
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
                                   className="text-gray-700 text-sm cursor-pointer  mb-2"
                                   onClick={() => onMapSelect(map)} // Handle map click
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
        </div>
  );
};
