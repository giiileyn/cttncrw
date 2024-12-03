import React, { useState, useEffect } from 'react';
import Product from './Product/Product';
import Loader from './Layout/Loader';
import axios from 'axios';

const Men = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMenProducts = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/v1/products?category=men');
            setProducts(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching men products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenProducts();
    }, []);

    return (
        <div className="container container-fluid">
            <h1 id="products_heading">Men's Collection</h1>
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

export default Men;
