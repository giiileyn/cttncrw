// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import './Checkout.css';

// const Checkout = () => {
//   const [shippingInfo, setShippingInfo] = useState({
//     address: '',
//     city: '',
//     phoneNo: '',
//     postalCode: '',
//     country: '',
//   });

//   const [error, setError] = useState('');
//   const history = useHistory();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setShippingInfo({
//       ...shippingInfo,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Basic validation
//     const { address, city, phoneNo, postalCode, country } = shippingInfo;

//     if (!address || !city || !phoneNo || !postalCode || !country) {
//       setError('All fields are required.');
//       return;
//     }

//     // You can later send this data to your backend or store it
//     console.log('Shipping Info Submitted:', shippingInfo);
//     // Redirect to a confirmation or summary page
//     history.push('/confirmation');
//   };

//   return (
//     <div className="checkout-container">
//       <h2>Shipping Information</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSubmit} className="checkout-form">
//         <div className="form-group">
//           <label htmlFor="address">Address</label>
//           <input
//             type="text"
//             id="address"
//             name="address"
//             value={shippingInfo.address}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="city">City</label>
//           <input
//             type="text"
//             id="city"
//             name="city"
//             value={shippingInfo.city}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="phoneNo">Phone Number</label>
//           <input
//             type="text"
//             id="phoneNo"
//             name="phoneNo"
//             value={shippingInfo.phoneNo}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="postalCode">Postal Code</label>
//           <input
//             type="text"
//             id="postalCode"
//             name="postalCode"
//             value={shippingInfo.postalCode}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="country">Country</label>
//           <input
//             type="text"
//             id="country"
//             name="country"
//             value={shippingInfo.country}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" className="submit-btn">
//           Submit Shipping Info
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Checkout;
