import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import './App.css'
import Header from './components/layout/Header'
import Footer from './Components/Layout/Footer'
import Home from './Components/Home';



function App() {
  
  return (
    <>

      <Header/>
      <Router>
        <Routes>
          <Route path ="/" element={<Home />} exact="true" />
        </Routes>
      </Router>
      <Footer/>
      
    </>
  )
}

export default App