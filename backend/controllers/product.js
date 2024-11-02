const Product = require('../models/product'); 

// Get All Products
exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        console.log("Retrieved products:", products);

        if (!products || products.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found' });
        }

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error("Error in getProducts:", error); 
        res.status(500).json({
            success: false,
            message: "Error loading the products",
            error: error.stack 
        });
    }
};

// Get Single Product
exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        console.error("Error in getSingleProduct:", error); 
        res.status(500).json({
            success: false,
            message: "Error retrieving the product",
            error: error.stack 
        });
    }
};
