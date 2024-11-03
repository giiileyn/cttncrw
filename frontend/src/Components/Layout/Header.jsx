import React from 'react'
import '../../App.css'




const Header = () => {
	return (
		<>
		
			<nav className="navbar row">
				<div className="col-12 col-md-3">
					<div className="navbar-brand">
						<img src="./images/cottoncrew.png" />
						<p>Cotton Crew</p>
					</div>
				</div>
				

				<div className = 'nav-menu'>
					<ul>
						<li>Home</li>
						<li>Women</li>
						<li>men</li>
						<li>kids</li>
						<li>todlder</li>
					</ul>
				</div>

				
				
				<div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
					<button className="btn" id="login_btn">Login</button>

					<span id="cart" className="ml-3">
					<img src="./images/cart_icon.png" alt="Cart" id="cart_image"/>
					</span>
					<span className="ml-1" id="cart_count">0</span>
				</div>
			</nav>
		</>
	)
}

export default Header