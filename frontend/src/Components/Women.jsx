import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product/Product';
import MetaData from './Layout/MetaData';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Women.css';

// Custom loading spinner for admin
const AdminLoader = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
    <span>Loading...</span>
  </div>
);

const Women = () => {
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // Fetch women-related products
  const getWomenProducts = async (page = 1) => {
    try {
      const link = `http://localhost:3000/api/v1/products?page=${page}&category=women`;
      const res = await axios.get(link);
      if (res.data.data.length < 10) {
        setHasMore(false);  // Disable infinite scroll when no more products
      }
      setProducts((prevProducts) => [...prevProducts, ...res.data.data]);
      setProductsCount(res.data.count);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching women products:', error);
      setLoading(false);
    }
  };

  const fetchMoreData = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    getWomenProducts(currentPage);
  }, [currentPage]);

  return (
    <>
      <MetaData title={'Women Products'} />
      {loading && currentPage === 1 ? (
        <AdminLoader />
      ) : (
        <div className="container container-fluid">
          <h1 id="products_heading">Women's Products</h1>
          <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<AdminLoader />}
            scrollThreshold={0.95}
            endMessage={<p style={{ textAlign: 'center' }}>No more products available</p>}
          >
            <section id="products" className="container mt-5">
              <div className="row">
                {products.length > 0 ? (
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))
                ) : (
                  <h4>No products found</h4>
                )}
              </div>
            </section>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default Women;
