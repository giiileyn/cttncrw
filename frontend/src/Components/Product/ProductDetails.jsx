import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MetaData from '../Layout/MetaData'
import { Carousel } from 'react-bootstrap'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductDetails.css'

import axios from 'axios'
const ProductDetails = () => {
    const [product, setProduct] = useState({})
    const [error, setError] = useState('')
    const [quan, setQuan] =  useState(1)
    let { id } = useParams()
    let navigate = useNavigate()

    const increaseQuan =  () =>{
        const count = document.querySelector('.count')
        if (count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuan(qty)
        // if (quan >= product.stock) return;
        // setQuan(prevQty => prevQty + 1);
    }

    const decreaseQuan = () =>{
        const count = document.querySelector('.count')
        if (count.valueAsNumber <= 1) return;
        const qty = count.valueAsNumber - 1;
        setQuan(qty)
        // if (quan <= 1) return;
        // setQuan(prevQty => prevQty - 1);
    }

    const productDetails = async (id) => {
        try {
            let res = await axios.get(`http://localhost:3000/api/v1/product/${id}`);
            setProduct(res.data.product);
        } catch (err) {
            setError('Product not found');
        }
    }


    const addItemCart = () => {
        // Check if user is logged in by checking localStorage
        const user = JSON.parse(localStorage.getItem('user'));  // Assuming user info is stored in localStorage
        if (!user) {
            // If no user is found in localStorage, redirect to the home page
            toast.error('Please login to add items to your cart');
            navigate('/login');
            return;
        }

        // Create a cart item object
        const cartItem = {
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0]?.url, // Use the first image if available
            quantity: quan,
        };

        // Fetch existing cartItems from localStorage or initialize
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Check if the product already exists
        const productIndex = cartItems.findIndex(item => item.productId === product._id);
        if (productIndex >= 0) {
            cartItems[productIndex].quantity += quan;  // Increment quantity if the product already exists
        } else {
            cartItems.push(cartItem);  // Add new product if not in cart
        }

        // Save back to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        toast.success('Product added to cart');
        };

    useEffect(() => {
        productDetails(id)
        if (error) {
            navigate('/')
            setError('')
        }
    }, [id, error]);


       
    return (    
        <>
            <MetaData title={product.name} />
            <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-5 img-fluid" id="product_image">
                    <Carousel pause='hover'>
                        {product.images && product.images.map(image => (
                            <Carousel.Item key={image.public_id}>
                                <img className="d-block w-100" src={image.url} alt={product.title} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>

                <div className="col-12 col-lg-5 mt-5">
                    <h3>{product.name}</h3>
                    <p id="product_id">Product # {product._id}</p>

                    <hr />

                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                    </div>
                    <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                    <hr />

                    <p id="product_price">₱{product.price}</p>
                    <div className="stockCounter d-inline">
                        <span className="btn btn-danger minus" onClick={decreaseQuan}>-</span>
                        <input type="number" className="form-control count d-inline" value={quan} readOnly />
                        <span className="btn btn-primary plus" onClick={increaseQuan}>+</span>
                    </div>


                    <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" onClick={addItemCart} disabled={product.stock === 0}>Add to Cart</button>

                    <hr />

                    <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                    <hr />

                    <h4 className="mt-2">Description:</h4>
                    <p>{product.description}</p>
                    <hr />
                    <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                    {/* <div className="alert alert-danger mt-5" type='alert'>Login to post your review.</div> */}
                    <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal"  >
                               
                               
                                Submit Your Review
                            </button>
                    <div className="row mt-2 mb-5">
                        <div className="rating w-50">

                            <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">

                                            <ul className="stars" >
                                                <li className="star"><i className="fa fa-star"></i></li>
                                                <li className="star"><i className="fa fa-star"></i></li>
                                                <li className="star"><i className="fa fa-star"></i></li>
                                                <li className="star"><i className="fa fa-star"></i></li>
                                                <li className="star"><i className="fa fa-star"></i></li>
                                            </ul>

                                            <textarea
                                                name="review"
                                                id="review" className="form-control mt-3"
                                          
                                            >
                                            </textarea>

                                            
                                            <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close" >Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ProductDetails