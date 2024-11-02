const Product = require('../models/product'); 
exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        console.log("Retrieved products:", products); // For debugging
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error("Error in getProducts:", error); // Detailed error
        res.status(500).json({
            success: false,
            message: "Error loading the products",
            error: error.stack // Include stack for better debugging
        });
    }
};
