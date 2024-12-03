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
// import OrderList from './Components/Order/OrderList';
import OrderList from './Components/Order/OrderList';
import ProductList from './Components/Admin/ProductList';
import AdminProdDetails from './Components/Admin/AdminProdDetails.jsx';
import AdminOrderList from './Components/Admin/AdminOrderList.jsx';
// import SecretRoute from './Components/Auth/SecretRoute.js';
import NewProduct from './Components/Admin/NewProduct.jsx';
import EditProd from './Components/Admin/EditProd.jsx';
import EditProfile from './Components/Auth/EditProfile.jsx';
import Profile from './Components/Auth/Profile.jsx';
import Women from './Components/Women.jsx';
import Men from './Components/Men.jsx';
import Kids from './Components/Kids.jsx';
import Toddlers from './Components/Toddlers.jsx';


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

  // const renderHomeOrProducts = () => {
  //   if (userRole === 'admin') {
  //     return <ProductList />;  // If user is admin, show ProductList
  //   }
  //   return <Home />;  // Otherwise, show Home
  // };


  return (
    <Router>
      {/* <Header /> */}
      <Header  cartItems={cartItems}/>
      {/* Define Routes here */}
      <Routes>
        <Route path="/" element={<Home />} exact="true" />
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/toddlers" element={<Toddlers />} />
        {/* <Route path="/" element={renderHomeOrProducts()} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} exact="true" />
        <Route path="/password/forgot" element={<ForgotPass />} exact="true" />
        <Route path="/password/reset/:token" element={<NewPass />} exact="true" />

        <Route path="/cart" element={<Cart  />} exact="true" />
        {/* <Route path="/checkout" element={<Checkout  />} exact="true" /> */}
        {/* <Route path="/shipping" element={<Shipping  />} /> */}
        <Route path="/order/me" element={<OrderList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/admin/products/:id" element={<AdminProdDetails />}  />
        <Route path="/admin/order" element={<AdminOrderList />} />
        <Route path="/admin/products/add" element={<NewProduct />} />
        <Route path="/admin/product/edit/:productId" element={<EditProd />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/profile" element={<Profile />} />

        {/* <Route
          path="/products"
          element={
            <SecretRoute allowedRoles={['admin']}>
              <ProductList />
            </SecretRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <SecretRoute allowedRoles={['admin']}>
              <UserOrders />
            </SecretRoute>
          }
        /> */}
      </Routes>

      <Footer />
      <ToastContainer/>
    </Router>
    
  );
}

export default App