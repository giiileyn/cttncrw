import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MetaData from './Layout/MetaData'
import axios from 'axios'
import Product from './Product/Product'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider';




const Home = () => {
    const [products, setProducts] = useState([])
    const [productsCount, setProductsCount] = useState(0)
    const [filteredProductsCount, setFilteredProductsCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [resPerPage, setResPerPage] = useState(0)
    let { keyword } = useParams();
    const getProducts = async (keyword='', page =1) => {

        let link = `http://localhost:5000/api/v1/products?keyword=${keyword}`
        // link = `http://localhost:4001/api/v1/products?page=${page}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}`


        let res = await axios.get(link)
        console.log(res)
        setProducts(res.data.data)
        setProductsCount(res.data.count)
        setFilteredProductsCount(res.data.filteredProductsCount)
        setResPerPage(res.data.resPerPage)
    }

    let count = productsCount
    if (keyword) {
        count = filteredProductsCount
    }

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        getProducts(keyword, currentPage)
    }, [keyword, currentPage]);
    return (
        <>
            <MetaData title={'Buykrfn'} />
            <div className="container container-fluid">
                <h1 id="products_heading">Latest Products</h1>
                <section id="products" className="container mt-5">
                    <div className="row">
                        {products && products.map(product => (
                            <Product key={product._id} product={product} />
                        ))}

                    </div>
                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={count}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>)}   
                </section>
            </div>
        </>
    )
}

export default Home