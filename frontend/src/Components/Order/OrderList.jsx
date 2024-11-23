import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../utils/helpers';

const OrderList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [myOrdersList, setMyOrdersList] = useState([]);

    const myOrders = async () => {
        try {
            const token = getToken();
            console.log("Retrieved Token:", token);
    
            if (!token) {
                throw new Error("Token not found. Please log in again.");
            }
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
    
            console.log("Request Config:", config); // Debug headers

            const { data } = await axios.get('http://localhost:3000/api/v1/order/me', config);
            console.log("API Response Data:", data);
    
            setMyOrdersList(data.orders || data.order || []);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to fetch orders.";
            console.error("Error fetching orders:", errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        myOrders();
    }, []);

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: 'bottom-right',
            });
        }
    }, [error]);

    const setOrders = () => {
        const data = {
            columns: [
                { label: 'Order ID', field: 'id', sort: 'asc' },
                { label: 'Product Name', field: 'name', sort: 'asc' },
                { label: 'Quantity', field: 'quantity', sort: 'asc' },
                { label: 'Price', field: 'price', sort: 'asc' },
                { label: 'Actions', field: 'actions', sort: 'asc' },
            ],
            rows: [],
        };

        if (Array.isArray(myOrdersList) && myOrdersList.length > 0) {
            myOrdersList.forEach((order) => {
                if (Array.isArray(order.orderItems) && order.orderItems.length > 0) {
                    order.orderItems.forEach((item) => {
                        data.rows.push({
                            id: order._id,
                            name: item.name,
                            quantity: item.quantity,
                            price: `$${item.price}`,
                            actions: (
                                <Link to={`/order/${order._id}`} className="btn btn-primary">
                                    <i className="fa fa-eye"></i>
                                </Link>
                            ),
                        });
                    });
                }
            });
        }
        return data;
    };

    return (
        <>
            <MetaData title="My Orders" />
            <h1 className="my-5">My Orders</h1>
            {loading ? (
                <Loader />
            ) : (
                <MDBDataTable
                    data={setOrders()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            )}
        </>
    );
};

export default OrderList;
