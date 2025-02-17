import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import {Login} from './pages/login'; 
import {Register} from './pages/Register'; 
import { LandingPage } from './pages/LandingPage';
import { Navbar } from './componets/Navbar';
import { Profile } from './pages/Profile';
import { Orders } from './pages/Orders';
import { OrderDetails } from './pages/OrderDetails';
import { HotelProducts } from './pages/HotelProducts';
import ProtectedRoute from './services/ProtectedRoute';
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
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/hotelProducts/:id" element={<ProtectedRoute><HotelProducts /></ProtectedRoute>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
