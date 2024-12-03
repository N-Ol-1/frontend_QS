import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

function App() {
  // State to manage sidebar visibility
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  return (
    <>
      {/* Pass state and setter function to Header and Sidebar */}
      <Header isSidebarVisible={isSidebarVisible} setSidebarVisible={setSidebarVisible} />
      <Sidebar isSidebarVisible={isSidebarVisible} setSidebarVisible={setSidebarVisible} />
    </>
  );
}

export default App;
