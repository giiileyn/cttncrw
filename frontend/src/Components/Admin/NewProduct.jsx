import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './NewProduct.css';

const NewProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    seller: '',
  });
  const [images, setImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(productData).forEach((key) => formData.append(key, productData[key]));

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const { data } = await axios.post('http://localhost:3000/api/v1/products/new', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Product added successfully');
    } catch (error) {
      toast.error(error.response.data.message || 'Failed to add product');
    }
  };

  return (
    <div className="new-product-container">
      <h1>Add New Product</h1>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <div>
          <label>Product Name:</label>
          <input type="text" name="name" value={productData.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={productData.price} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={productData.description} onChange={handleInputChange} required></textarea>
        </div>
        <div>
          <label>Category:</label>
          <select name="category" value={productData.category} onChange={handleInputChange} required>
            <option value="">Select Category</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kids">Kids</option>
            <option value="toddler">Toddler</option>
          </select>
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" name="stock" value={productData.stock} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Seller:</label>
          <input type="text" name="seller" value={productData.seller} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Images:</label>
          <input type="file" name="images" onChange={handleFileChange} multiple required />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default NewProduct;
