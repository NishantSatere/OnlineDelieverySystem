import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import {Login} from './pages/login'; 
import {Register} from './pages/Register'; 
import { LandingPage } from './pages/LandingPage';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="main">
          <Routes>

            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
