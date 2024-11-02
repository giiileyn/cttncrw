import React, { useState, useEffect } from 'react'
import MetaData from './Layout/MetaData'
import axios from 'axios'
import Product from './Product/Product'



const Home = () => {
    const [products, setProducts] = useState([])
    const [productsCount, setProductsCount] = useState(0)
    const getProducts = async () => {
        const link = 'http://localhost:5000/api/v1/products';  
        try {
            const res = await axios.get(link);
            console.log(res); 
            setProducts(res.data.data);  
            setProductsCount(res.data.count);  
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getProducts()
    }, []);
    return (
        <>
            <MetaData title={'Buy Best Products Online'} />
            <div className="container container-fluid">
                <h1 id="products_heading">Latest Products</h1>
                <section id="products" className="container mt-5">
                    <div className="row">
                        {products && products.map(product => (
                            <Product key={product._id} product={product} />
                        ))}

                    </div>
                </section>
            </div>
        </>
    )
}

export default Home