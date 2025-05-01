import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import GamePage from './pages/GamePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </div>
  );
}

export default App;
