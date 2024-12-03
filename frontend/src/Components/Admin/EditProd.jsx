import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const EditProd = () => {
  const { productId } = useParams(); // Extract productId from URL params
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    seller: '',
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId) {
      toast.error('Product ID is missing!');
      return;
    }

    const fetchProductData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:3000/api/v1/product/${productId}`);
        setProductData({
          name: data.product.name,
          price: data.product.price,
          description: data.product.description,
          category: data.product.category,
          stock: data.product.stock,
          seller: data.product.seller,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data?.message || 'Failed to fetch product data');
      }
    };

    fetchProductData();
  }, [productId]);

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
      const { data } = await axios.put(`http://localhost:3000/api/v1/product/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Product updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update product');
    }
  };

  return (
    <div className="new-product-container">
      <h1>Edit Product</h1>
      {loading ? (
        <p>Loading product details...</p>
      ) : (
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <div>
            <label>Product Name:</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Category:</label>
            <select
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kids">Kids</option>
              <option value="toddler">Toddler</option>
            </select>
          </div>
          <div>
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Seller:</label>
            <input
              type="text"
              name="seller"
              value={productData.seller}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Images:</label>
            <input
              type="file"
              name="images"
              onChange={handleFileChange}
              multiple
            />
          </div>
          <button type="submit">Update Product</button>
        </form>
      )}
    </div>
  );
};

export default EditProd;
