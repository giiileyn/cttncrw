import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/layout/Header';
import Footer from './Components/Layout/Footer'
// import Search from './Components/Layout/Search';
import Home from './Components/Home';
import ProductDetails from './Components/Product/ProductDetails';
// import Register from './Components/Auth/Register';
import { AuthProvider } from './Contexts/AuthContext';
import Register from './Components/Auth/Register';
import './App.css'
import Login from './Components/Auth/Login';


function App() {
  
  
  return (
    <Router>
      <Header />
      
      {/* Define Routes here */}
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} exact />
        
      </Routes>

      <Footer />
      <ToastContainer/>
    </Router>
    
  );
}

export default App