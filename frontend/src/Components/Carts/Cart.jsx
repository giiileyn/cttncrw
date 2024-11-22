import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Cart.css';


const Cart = () => {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
    const [showShippingForm, setShowShippingForm] = useState(false);// State to show the checkout form
    const [shippingInfo, setShippingInfo] = useState(
      JSON.parse(localStorage.getItem('shippingInfo')) || {
        address: '',
        city: '',
        phoneNo: '',
        postalCode: '',
        country: ''
      }
    );

    const navigate = useNavigate();

    useEffect(() => {
      // Re-fetch cartItems from localStorage whenever the component mounts or when cartItems change
      setCartItems(JSON.parse(localStorage.getItem('cartItems')) || []);
    }, []);
  
    const removeItemFromCart = (productId) => {
      // Remove the item from the cartItems array
      const updatedCart = cartItems.filter(item => item.productId !== productId);
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    const increaseQty = (id, quantity, stock) => {
      const newQty = quantity + 1;
      if (newQty > stock) return;
      const updatedCart = cartItems.map(item =>
        item.productId === id ? { ...item, quantity: newQty } : item
      );
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };
  
    const decreaseQty = (id, quantity) => {
      const newQty = quantity - 1;
      if (newQty <= 0) return;
      const updatedCart = cartItems.map(item =>
        item.productId === id ? { ...item, quantity: newQty } : item
      );
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };
  
    const getTotalPrice = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleShippingChange = (e) => {
      const { name, value } = e.target;
      setShippingInfo({ ...shippingInfo, [name]: value });
    };

    const saveShippingAddress = () => {
      localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
      toast.success('Shipping address saved.', { position: 'bottom-right' });
    };

    
    const handleCheckout = async (e) => {
      e.preventDefault();
    
      // Check if shipping details are filled
      if (
        !shippingInfo.address ||
        !shippingInfo.city ||
        !shippingInfo.phoneNo ||
        !shippingInfo.postalCode ||
        !shippingInfo.country
      ) {
        toast.error("Please fill in all shipping details.");
        return;
      }
    
      // Prepare the order data to be sent
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          product: item.productId
        })),
        shippingInfo,
        itemsPrice: getTotalPrice(),
        totalPrice: getTotalPrice(),
        paymentInfo: {}  // Add actual payment info if needed
      };
    
      // Define headers with the token
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      };
    
      try {
        // Make the API call to place the order
        const response = await axios.post('http://localhost:3000/api/v1/order/new', orderData, config);

        
        if (response.data.success) {
           toast.success('Order placed successfully.', { position: 'bottom-right' });
                localStorage.removeItem('cartItems');
                setCartItems([]);
                setShowShippingForm(false);
                navigate('/success');
        } else {
          // If the response does not indicate success, show an error
          toast.error('Failed to place the order. Please try again.', { position: 'bottom-right' });
            }
      } catch (error) {
        // Handle any errors that occur during the API request
        toast.error(error.response?.data?.message || 'Failed to place order.', {
          position: 'bottom-right'
        });
        console.error(error);
      }
    };
    
  

  
    return (
      <div className="cart-container">
      <div className="cart-left">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map(item => (
            <div key={item.productId} className="cart-item">
              {/* Column 1: Image */}
              <img src={item.image} alt={item.name} />
              {/* Column 2: Product Details */}
              <div>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p>Price: ₱{item.price}</p>
              </div>
              {/* Column 3: Quantity */}
              <div className="quantity-column">
                <button onClick={() => decreaseQty(item.productId, item.quantity)} className="quantity-btn">
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.productId, item.quantity, item.stock)} className="quantity-btn">
                  +
                </button>
              </div>
              {/* Column 4: Remove Button */}
              <div>
                <button onClick={() => removeItemFromCart(item.productId)}>X</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-right">
        <h3>Order Summary</h3>
        <p className="summary-detail">Total Items: {cartItems.length}</p>
        <p className="total-price">Total Price: ₱{getTotalPrice()}</p>
        <button className="checkout-btn" onClick={() => setShowShippingForm(true)}>
          Checkout
        </button>


        {showShippingForm && (
          <form className="shipping-form" onSubmit={handleCheckout}>
            <h3>Shipping Information</h3>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={shippingInfo.address}
              onChange={handleShippingChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={shippingInfo.city}
              onChange={handleShippingChange}
              required
            />
            <input
              type="text"
              name="phoneNo"
              placeholder="Phone Number"
              value={shippingInfo.phoneNo}
              onChange={handleShippingChange}
              required
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={shippingInfo.postalCode}
              onChange={handleShippingChange}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={shippingInfo.country}
              onChange={handleShippingChange}
              required
            />
             <button type="button" className="save-btn" onClick={saveShippingAddress}>
              Save Address
            </button>

            <button type="submit" className="submit-btn" >
              Submit Shipping Info
            </button>
          </form>
        )}
      </div>
    </div>
    );
    
  };
  
  export default Cart;