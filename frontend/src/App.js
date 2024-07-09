import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import {Login} from './pages/login'; 
import {Register} from './pages/Register'; 
import { LandingPage } from './pages/LandingPage';
import { Navbar } from './componets/Navbar';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <div className="">
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
