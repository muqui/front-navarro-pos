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
import { PrivateRoute } from './components/PrivateRoute';
function App() {
 

  return (
    
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sale" element={<PrivateRoute><Sale/> </PrivateRoute>} />
      <Route path="/product" element={ <PrivateRoute><Products/> </PrivateRoute> } />
      <Route path="/inventory" element={   <PrivateRoute><Inventory/> </PrivateRoute>} />
      <Route path="/config" element={<PrivateRoute> <Config/></PrivateRoute>} />
      <Route path="/report" element={<PrivateRoute> <Report/></PrivateRoute>} />
      <Route path="/repair" element={<PrivateRoute>  <Repair/></PrivateRoute>} />
      </Routes>
   
    </BrowserRouter>
    
  
  )
}

export default App
