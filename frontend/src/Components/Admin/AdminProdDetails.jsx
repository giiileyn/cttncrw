import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MetaData from '../Layout/MetaData';
import { Carousel } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../Product/ProductDetails.css';

const AdminProdDetails = () => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    let { id } = useParams();
    const navigate = useNavigate();

    const productDetails = async (id) => {
        try {
            const res = await axios.get(`http://localhost:3000/api/v1/product/${id}`);
            setProduct(res.data.product);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError('Product not found');
        }
    };

    useEffect(() => {
        if (id) {
            productDetails(id);
        }
    }, [id]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            setError('');
        }
    }, [error]);

    const handleEditProd = () => {
        navigate(`/admin/product/edit/${product._id}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <MetaData title={product.name} />
            <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-5 img-fluid" id="product_image">
                    <Carousel pause="hover">
                        {product.images &&
                            product.images.map((image) => (
                                <Carousel.Item key={image.public_id}>
                                    <img className="d-block w-100" src={image.url} alt={product.name} />
                                </Carousel.Item>
                            ))}
                    </Carousel>
                </div>

                <div className="col-12 col-lg-5 mt-5">
                    <h3>{product.name}</h3>
                    <p id="product_id">Product # {product._id}</p>

                    <hr />

                    <div className="rating-outer">
                        <div
                            className="rating-inner"
                            style={{ width: `${(product.ratings / 5) * 100}%` }}
                        ></div>
                    </div>
                    <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                    <hr />

                    <p id="product_price">₱{product.price}</p>
                    <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                    <hr />

                    <h4 className="mt-2">Description:</h4>
                    <p>{product.description}</p>
                    <hr />
                    <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                      {/* Reviews Section */}
                      {/* Reviews Section */}
                    <h4>Reviews:</h4>
                    {product.reviews && product.reviews.length > 0 ? (
                    <div>
                        {product.reviews.map((review, index) => (
                        <div key={index} className="review">
                            {/* Display the reviewer's name */}
                            <p><strong>{review.name}</strong></p>

                            {/* Display the comment */}
                            <p>{review.comment}</p>

                            <hr />
                        </div>
                        ))}
                    </div>
                    ) : (
                    <p>No reviews yet</p>
                    )}

                   
                    <button
                        className="btn btn-primary mt-3"
                        onClick={handleEditProd} // Call handleEditProd function
                    >

                        <FontAwesomeIcon icon={faPen} className="me-2" /> Edit Product
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminProdDetails;
