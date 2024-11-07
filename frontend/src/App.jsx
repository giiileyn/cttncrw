import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import './App.css'
import Header from './components/layout/Header';
import Footer from './Components/Layout/Footer'
// import Search from './Components/Layout/Search';
import Home from './Components/Home';
import ProductDetails from './Components/Product/ProductDetails';



function App() {
  
  
  return (
    <>

      <Header/>
      <Router>
     
        <Routes>
          <Route path ="/" element={<Home />} exact="true" />
          {/* <Search/> */}
          <Route path="/product/:id" element={<ProductDetails/>} exact="true" />
          {/* <Route path="/search/:keyword" element={<Home />} exact="true" /> */}
        </Routes>
      </Router>
      <Footer/>
      
    </>
  )
}

export default App