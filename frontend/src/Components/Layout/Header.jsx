import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Searchh from '../HeaderContent/Searchh';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Header.css';

const Header = ({ cartItems }) => {
  const [user, setUser] = useState(null); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role'); 
    localStorage.removeItem('cartItems'); // Assuming your cart items are stored under this key
    toast.success('Logged out', { position: 'bottom-right' });
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);  // Set user data from localStorage if token exists
    }
  }, []);
  
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const defaultAvatar = '/images/avatar.jpg';

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3 d-flex align-items-center">
        <div className="navbar-brand d-flex align-items-center">
          <img src="./images/cottoncrew.png" alt="Cotton Crew Logo" className="navbar-logo" />
          <p className="ms-2">Cotton Crew</p>
        </div>
      </div>

      <div className="nav-menu">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#">Women</a></li>
          <li><a href="#">Men</a></li>
          <li><a href="#">Kids</a></li>
          <li><a href="#">Toddlers</a></li>
        </ul>
      </div>

      <Searchh />

      <div className="dropdown-container">
        <button 
          className="settings-logo" 
          onClick={toggleDropdown}
        >
          <img src="./images/settings-icon.png" alt="Settings" className="settings-icon" />
        </button>
        
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {user ? (
              <>
             
              <Link to="/profile" className="dropdown-item">Profile</Link>
                
                {user.role === 'admin' && (
                  <>
                  <Link to="/orders" className="dropdown-item">Orders</Link>
                  <Link to="/add-product" className="dropdown-item">Add Product</Link>
                </>
                )}
                <button className="dropdown-item text-danger" onClick={logoutHandler}>Logout</button>
              </>
            ) : (
              <Link to="/login" className="login-btn">Login</Link>
              // <button className="dropdown-item text-danger" onClick={logoutHandler}>login</button>
            )}
          </div>
        )}

        <Link to="/cart" style={{ textDecoration: 'none' }}>
          <span id="cart" className="ml-3">Cart</span>
        </Link>
        <span className="ml-1" id="cart_count">{cartItems.length}</span>
      </div>
    </nav>
  );
};

export default Header;
