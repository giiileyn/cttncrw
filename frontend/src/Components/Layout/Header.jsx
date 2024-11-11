import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../../App.css'; // Ensure this path is correct for your project
import Searchh from '../HeaderContent/Searchh';

const Header = () => {
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

      <Searchh/>

      <div className="cart">
        {/* Use Link for navigation */}
        <Link to="/login">
          <button className="btn" id="login_btn">Login</button>
        </Link>

        <span id="cart" className="ml-3 position-relative">
          <img src="./images/cart_icon.png" alt="Cart" id="cart_image" />
          <span className="cart_count" id="cart_count">0</span>
        </span>
      </div>
    </nav>
  );
}

export default Header;
