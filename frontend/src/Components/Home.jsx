import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MetaData from './Layout/MetaData'
import axios from 'axios'
import Product from './Product/Product'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Loader from './Layout/Loader' //new

const Home = () => {
    const [products, setProducts] = useState([])
    const [productsCount, setProductsCount] = useState(0)
    const [filteredProductsCount, setFilteredProductsCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [resPerPage, setResPerPage] = useState(0)
    const [price, setPrice] = useState([1, 1000]);

    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true) //new
    let { keyword } = useParams();

    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = Slider.Range;
    // const createSliderWithTooltip = Slider.createSliderWithTooltip;


    const categories = [
        'women',
        'men',
        'kid',
        'toddler',
        'Home'
    ]

    const getProducts = async (keyword = '', page = 1, priceRange, category,) => {

        try {
            let link = `http://localhost:3000/api/v1/products?page=${page}&keyword=${keyword}&price[lte]=${priceRange[1]}&price[gte]=${priceRange[0]}`

            if (category){
                link  = `http://localhost:3000/api/v1/products?page=${page}&keyword=${keyword}&price[lte]=${priceRange[1]}&price[gte]=${priceRange[0]}&category=${category}`

            }
            let res = await axios.get(link)
            setProducts(res.data.data)
            setProductsCount(res.data.count)
            setFilteredProductsCount(res.data.filteredProductsCount)
            setResPerPage(res.data.resPerPage)
            setLoading(false)//new
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    let count = productsCount
    if (keyword) {
        count = filteredProductsCount
    }

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        getProducts(keyword, currentPage, price, category, )
    }, [keyword, currentPage, price,  category,]);

    return (
        <>
            <MetaData title={'Buykrfn'} />
            {/* <div className="container container-fluid"> */}
            {loading ? <Loader /> : ( <div className="container container-fluid">
                <h1 id="products_heading">Latest Products</h1>
                <section id="products" className="container mt-5">
                    <div className="row">
                        {keyword ? (
                            <>
                                <div className="col-6 col-md-3 mt-5 mb-5">
                                    <div className="px-5">
                                        <Range
                                            marks={{
                                                1: `$1`,
                                                1000: `$1000`
                                            }}
                                            min={1}
                                            max={1000}
                                            defaultValue={[1, 1000]}
                                            // onChange={(price) => setPrice(price)}
                                            tipFormatter={(value) => `$${value}`}
                                            tipProps={{
                                                placement: "top",
                                                visible: true
                                            }}
                                            value={price}
                                            onChange={price => setPrice(price)}
                                        />
                                        <hr className="my-5" />
                                        <hr className="my-5" />
                                        <div className="mt-5">
                                        <h4 className="mb-3">
                                                    Categories
                                        </h4>
                                        <ul className="pl-0">
                                                    {categories.map(category => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={category}
                                                            onClick={() => setCategory(category)}
                                                        >
                                                            {category}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                    </div>
                                </div>

                                <div className="col-6 col-md-9">
                                    <div className="row">
                                        {products.map(product => (
                                            <Product key={product._id} product={product} />
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            products.map(product => (
                                <Product key={product._id} product={product} />
                            ))
                        )}
                    </div>
                </section>

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
    
                
                </div>)}
               
            </>
        )
    }


export default Home;