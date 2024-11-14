import React, { useState } from 'react';

  export const Sidebar = () => {
  // States to manage dropdown visibility
  const [isFirstOptionExpanded, setIsFirstOptionExpanded] = useState(false);
  const [isFirstSubOptionExpanded, setIsFirstSubOptionExpanded] = useState(false);
  const [isSidebarVisible,setSidebarVisible]=useState(false);

  // Toggle functions
  const toggleFirstOption = () => setIsFirstOptionExpanded(!isFirstOptionExpanded);
  const toggleFirstSubOption = () => setIsFirstSubOptionExpanded(!isFirstSubOptionExpanded);

  return (
    <div>
        {/* Toggle Button for Sidebar */}
      {!isSidebarVisible && (
        <button
          className="text-2xl p-2 rounded-lg  top-4 left-4 absolute text-black"
          onClick={() => setSidebarVisible(true)}
        >
          Cursos
        </button>
      )}



    {isSidebarVisible && (
    <div className="w-64 bg-white h-screen p-4 border-r absolute ">
        <div className='grid grid-cols-2'>
                <h2 className="text-xl font-semibold mb-4">Sidebar</h2>
                <button 
                
                className='text-3xl justify-self-end  text-right'
                onClick={()=>{setSidebarVisible(false)}}
                
                >
                x    
                </button>    

        </div>
      
  
        {/* Option 1 with Dropdown */}
        <div className="cursor-pointer  p-2 rounded-lg mb-2" onClick={toggleFirstOption}>
          Option 1 {isFirstOptionExpanded ? '▲' : '▼'}
        </div>
        {isFirstOptionExpanded && (
          <div className="ml-4">
            <div
              className="cursor-pointer p-2 rounded-lg mb-1"
              onClick={toggleFirstSubOption}
            >
              Sub Option 1 {isFirstSubOptionExpanded ? '▲' : '▼'}
            </div>
  
            {/* Nested Dropdown for Sub Option 1 */}
            {isFirstSubOptionExpanded && (
              <div className="ml-4">
                <div className="cursor-pointer  p-2 rounded-lg mb-1">Nested Option 1</div>
                <div className="cursor-pointer  p-2 rounded-lg mb-1">Nested Option 2</div>
              </div>
            )}
  
            <div className="cursor-pointer  p-2 rounded-lg mb-1">Sub Option 2</div>
            <div className="cursor-pointer  p-2 rounded-lg mb-1">Sub Option 3</div>
            <div className="cursor-pointer  p-2 rounded-lg mb-1">Sub Option 4</div>
          </div>
        )}
  
        {/* Other Main Options */}
        <div className="cursor-pointer  p-2 rounded-lg mb-2">Option 2</div>
        <div className="cursor-pointer  p-2 rounded-lg mb-2">Option 3</div>
        <div className="cursor-pointer  p-2 rounded-lg">Option 4</div>
      </div>)};
    </div>
    
    
  );
};


