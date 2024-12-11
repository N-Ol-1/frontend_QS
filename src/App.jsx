import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { NewGrid } from './NewGrid';  // Import the NewGrid component
import NewMap from './NewMap'; // Import the NewMap component

function App() {
  // State to manage sidebar visibility
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // State to manage NewMap visibility
  const [isNewMapVisible, setNewMapVisible] = useState(false);

  // State to hold the selected map data
  const [mapData, setMapData] = useState(null);

  // Function to handle map selection and set the mapData
  const handleMapSelect = (map) => {
    setMapData(map); // Set the selected map data
  };

  return (
    <div className="relative">
      {/* Header */}
      <Header
        isSidebarVisible={isSidebarVisible}
        setSidebarVisible={setSidebarVisible}
        setNewMapVisible={setNewMapVisible} // Pass the function to toggle NewMap visibility
      />

      {/* Main Content */}
      <div className={`flex ${isSidebarVisible ? 'pl-64' : ''} transition-all duration-300`}>
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

          {/* Conditionally render the NewMap component */}
          {isNewMapVisible && (
            <div className="fixed top-20 left-0 w-full h-[calc(100%-80px)] bg-white z-40 p-4 overflow-auto">
              <NewMap />
              <button
                className="absolute top-4 right-4 text-lg px-4 py-2 rounded-lg bg-red-300 hover:bg-red-400 text-black"
                onClick={() => setNewMapVisible(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
