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

  const handlerEditProfile = () => {
    navigate('/profile/edit'); // Navigate to the edit profile page
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
          <li><Link to="/">Home</Link></li>
          <li><Link to="/women">Women</Link></li>
          <li><Link to="/men">Men</Link></li>
          <li><Link to="/kids">Kids</Link></li>
          <li><Link to="/toddlers">Toddlers</Link></li>
        </ul>
      </div>

     

      <Searchh />

      <div className="dropdown-container">
        {user ? (
          <span className="user-name">Hello, {user.name}</span>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
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
                <button 
                  className="dropdown-item" 
                  onClick={handlerEditProfile}
                >
                  Profile
                </button>

                {user.role === 'admin' && (
                  <>
                    <Link to="/admin/order" className="dropdown-item">Orders</Link>
                    <Link to="/products" className="dropdown-item">My Products</Link>
                  </>
                )}
                <Link to="/order/me" className="dropdown-item">My Orders</Link>
                <button className="dropdown-item text-danger" onClick={logoutHandler}>Logout</button>
              </>
            ) : (
              <Link to="/login" className="login-btn">Login</Link>
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
