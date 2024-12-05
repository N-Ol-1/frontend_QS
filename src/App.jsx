import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { NewGrid } from './NewGrid';  // Import the NewGrid component

function App() {
  // State to manage sidebar visibility
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // State to hold the selected map data
  const [mapData, setMapData] = useState(null);

  // Function to handle map selection and set the mapData
  const handleMapSelect = (map) => {
    setMapData(map); // Set the selected map data
  };

  return (
    <div className="relative">
      {/* Header */}
      <Header isSidebarVisible={isSidebarVisible} setSidebarVisible={setSidebarVisible} />

      {/* Main Content */}
      <div className={`flex ${isSidebarVisible ? 'pl-64' : ''} pt-20 transition-all duration-300`}>
        {/* Sidebar */}
        <Sidebar
          isSidebarVisible={isSidebarVisible}
          setSidebarVisible={setSidebarVisible}
          onMapSelect={handleMapSelect} // Pass the map selection handler to Sidebar
        />

        {/* Main Content Area */}
        <div className="flex-grow p-4">
          {/* Conditionally render the NewGrid component if a map is selected */}
          {mapData && <NewGrid map={mapData} />}
        </div>
      </div>
    </div>
  );
}

export default App;
