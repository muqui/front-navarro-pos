import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import Login from './pages/Login'
import { Sale } from './pages/Sale';
import './App.css';
import { Products } from './pages/Products';
import { Inventory } from './pages/Inventory';
import { Config } from './pages/Config';
import { Repair } from './pages/Repair';
import { Report } from './pages/Report';
function App() {
 

  return (
    
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sale" element={<Sale />} />
      <Route path="/product" element={<Products/>} />
      <Route path="/inventory" element={<Inventory/>} />
      <Route path="/config" element={<Config/>} />
      <Route path="/report" element={<Report/>} />
      <Route path="/repair" element={<Repair/>} />
      </Routes>
   
    </BrowserRouter>
    
  
  )
}

export default App
