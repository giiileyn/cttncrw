import { useState, useEffect } from 'react'
import { auth } from './firebase/firebaseConfig';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Header from './components/layout/Header';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer'
// import Searchh from './components/HeaderContent/Searchh';
import Home from './Components/Home';
import ProductDetails from './Components/Product/ProductDetails';
// import Register from './Components/Auth/Register';
import { AuthProvider } from './Contexts/AuthContext';
import Register from './Components/Auth/Register';
import './App.css'
import Login from './Components/Auth/Login';
import ForgotPass from './Components/Auth/ForgotPass';
import NewPass from './Components/Auth/NewPass';
import Cart from './Components/Carts/Cart';
// import Checkout from './Components/Carts/Checkout';
// import Shipping from './Components/Carts/Shipping';


import axios from 'axios';

function App() {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);

  // Function to add item to cart
  const addItemToCart = (item) => {
    const newCartItems = [...cartItems, item];
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  // Function to remove item from cart
  const removeItemFromCart = (itemId) => {
    const newCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  

  return (
    <Router>
      {/* <Header /> */}
      <Header  cartItems={cartItems}/>
      {/* Define Routes here */}
      <Routes>
        <Route path="/" element={<Home />} exact="true" />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} exact="true" />
        <Route path="/password/forgot" element={<ForgotPass />} exact="true" />
        <Route path="/password/reset/:token" element={<NewPass />} exact="true" />

        <Route path="/cart" element={<Cart  />} exact="true" />
        {/* <Route path="/checkout" element={<Checkout  />} exact="true" /> */}
        {/* <Route path="/shipping" element={<Shipping  />} /> */}
      </Routes>

      <Footer />
      <ToastContainer/>
    </Router>
    
  );
}

export default App