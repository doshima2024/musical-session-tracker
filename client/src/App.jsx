import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { SessionsPage } from './pages/SessionsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SessionsPage />} />
    </Routes>
  );
}

export default App;
