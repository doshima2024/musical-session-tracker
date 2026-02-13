import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { SessionsPage } from './pages/SessionsPage';
import { SessionDetailPage } from './pages/SessionDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SessionsPage />} />
      <Route path="/sessions/:id" element={<SessionDetailPage />} />
    </Routes>
  );
}

export default App;
