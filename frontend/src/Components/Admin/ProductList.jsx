import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        let allProducts = [];
        let page = 1;
        let totalPages;
        
        try {
            const { data } = await axios.get("http://localhost:3000/api/v1/adminProducts");
            setProducts(data.data || []);
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || error.message || "Failed to fetch products.";
            toast.error(errorMessage, { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        navigate(`/admin/products/${product._id}`);
        toast.info(`Viewing details for: ${product.name}`);
    };

    const handleAddProduct = () => {
        navigate("/admin/products/add"); // Redirect to the Add Product page
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://localhost:3000/api/v1/product/${productId}`);
                setProducts(products.filter((product) => product._id !== productId));
                toast.success("Product deleted successfully");
            } catch (error) {
                const errorMessage =
                    error.response?.data?.message || error.message || "Failed to delete product.";
                toast.error(errorMessage);
            }
        }
    };

    const columns = [
        { name: "name", label: "Product Name" },
        { name: "category", label: "Category" },
        { name: "price", label: "Price", options: { customBodyRender: (value) => `$${value}` } },
        { name: "stock", label: "Stock" },
        {
            name: "view",
            label: "View",
            options: {
                customBodyRender: (value, tableMeta, updateData) => {
                    const product = products[tableMeta.rowIndex];
                    return (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleViewDetails(product)}
                        >
                            <FontAwesomeIcon icon={faEye} /> View
                        </Button>
                    );
                },
            },
        },
        {
            name: "delete",
            label: "Delete",
            options: {
                customBodyRender: (value, tableMeta, updateData) => {
                    const product = products[tableMeta.rowIndex];
                    return (
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleDeleteProduct(product._id)}
                        >
                            <FontAwesomeIcon icon={faTrash} /> Delete
                        </Button>
                    );
                },
            },
        },
    ];

    const options = {
        selectableRows: "none",
        responsive: "standard",
        rowsPerPage: 10, // Set to display more rows per page
        rowsPerPageOptions: [10, 25, 50, 100],
        customToolbar: () => (
            <Button
                variant="contained"
                color="success"
                startIcon={<FontAwesomeIcon icon={faPlus} />}
                onClick={handleAddProduct}
                style={{ marginLeft: "20px" }} // Optional: Adjust spacing
            >
                Add Product
            </Button>
        ),
    };

    return (
        <div className="container">
            <Typography variant="h4" className="my-4">
                Product List
            </Typography>

            {loading ? (
                <Typography>Loading...</Typography>
            ) : products.length > 0 ? (
                <MUIDataTable title="Products" data={products} columns={columns} options={options} />
            ) : (
                <Typography>No products available.</Typography>
            )}

            {/* Display selected product details if available */}
            {selectedProduct && (
                <Box className="product-details">
                    <Typography variant="h6">Product Details:</Typography>
                    <Typography>Name: {selectedProduct.name}</Typography>
                    <Typography>Category: {selectedProduct.category}</Typography>
                    <Typography>Price: ${selectedProduct.price}</Typography>
                    <Typography>Stock: {selectedProduct.stock}</Typography>
                </Box>
            )}
        </div>
    );
};

export default ProductList;
