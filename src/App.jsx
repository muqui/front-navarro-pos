import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import Login from './pages/Login'
import { Sale } from './pages/Sale';

function App() {
 

  return (
    
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sale" element={<Sale />} />
      </Routes>
   
    </BrowserRouter>
    
  
  )
}

export default App
