import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { NewGrid } from './NewGrid';
import NewMap from './NewMap';
import NewAssessment from './NewAssessment';

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isNewMapVisible, setNewMapVisible] = useState(false);
  const [mapData, setMapData] = useState(null);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [isNewAssessmentVisible, setNewAssessmentVisible] = useState(false);

  const handleMapSelect = (map) => {
    setMapData(map); // Set the selected map data
  };

  const handleDataUpdate = () => {
    setDataUpdated((prev) => !prev); // Trigger Sidebar refresh
  };

  return (
    <div className="relative">
      <Header
        isSidebarVisible={isSidebarVisible}
        setSidebarVisible={setSidebarVisible}
        setNewMapVisible={setNewMapVisible}
      />

      <div className={`flex ${isSidebarVisible ? 'pl-64' : ''} transition-all duration-300`}>
        <Sidebar
          isSidebarVisible={isSidebarVisible}
          setSidebarVisible={setSidebarVisible}
          onMapSelect={handleMapSelect} // Pass map selection handler
          dataUpdated={dataUpdated}
        />

        <div className="flex-grow p-4">
          {mapData && <NewGrid map={mapData} />}
          {isNewMapVisible && (
            <div className="fixed top-20 left-0 w-full h-[calc(100%-80px)] bg-white z-40 p-4 overflow-auto">
              <NewMap onUpdate={handleDataUpdate} setNewMapVisible={setNewMapVisible} setNewAssessmentVisible={setNewAssessmentVisible}  />
            </div>
          )}
            {/* {isNewAssessmentVisible && (
            <div className="fixed top-20 left-0 w-full h-[calc(100%-80px)] bg-white z-40 p-4 overflow-auto">
              <NewAssessment map={mapData}  setNewAssessmentVisible={setNewAssessmentVisible} />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default App;
