import React, { useState } from 'react';
import { NewGrid } from './NewGrid';
import { Login } from './Login';
import  UserPage  from './UserPage';
import {AdminPage} from './AdminPage';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
  );
}

export default App;
