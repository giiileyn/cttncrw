import React, { useState, useEffect } from 'react';
import Product from './Product/Product';
import Loader from './Layout/Loader';
import axios from 'axios';

const Toddlers = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchtoddlerProducts = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/v1/products?category=toddler');
            setProducts(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching toddler products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchtoddlerProducts();
    }, []);

    return (
        <div className="container container-fluid">
            <h1 id="products_heading">toddler' Collection</h1>
            {loading ? <Loader /> : (
                <div className="row">
                    {products.map(product => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Toddlers;
