import React from 'react';
import '../../App.css'; // Ensure this path is correct for your project
import Searchh from './Searchh'


const Header = () => {
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3 d-flex align-items-center">
        <div className="navbar-brand d-flex align-items-center">
          <img src="./images/cottoncrew.png" alt="Cotton Crew Logo" className="navbar-logo" />
          <p className="ms-2">Cotton Crew</p>
        </div>
      </div>

      <div className="nav-menu ">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/women">Women</a></li>
          <li><a href="/men">Men</a></li>
          <li><a href="/kids">Kids</a></li>
          <li><a href="/toddlers">Toddlers</a></li>
        </ul>
      </div>
	  
		{/* <Searchh/> */}

      <div className="cart">
        <button className="btn" id="login_btn">Login</button>

        <span id="cart" className="ml-3 position-relative">
          <img src="./images/cart_icon.png" alt="Cart" id="cart_image" />
          <span className="cart_count" id="cart_count">0</span>
        </span>
      </div>
    </nav>
  );
}

export default Header;
