import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MetaData from './Layout/MetaData'
import axios from 'axios'
import Product from './Product/Product'



const Home = () => {
    const [products, setProducts] = useState([])
    const [productsCount, setProductsCount] = useState(0)
    const [filteredProductsCount, setFilteredProductsCount] = useState(0)
    let { keyword } = useParams();
    const getProducts = async (keyword='') => {

        let link = `http://localhost:5000/api/v1/products?keyword=${keyword}`
        // link = `http://localhost:4001/api/v1/products?page=${page}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}`


        let res = await axios.get(link)
        console.log(res)
        setProducts(res.data.data)
        setProductsCount(res.data.count)
        setFilteredProductsCount(res.data.filteredProductsCount)
    }

    useEffect(() => {
        getProducts(keyword)
    }, [keyword]);
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