const Product = require('../models/product'); 
const APIFeatures = require('../utils/apiFeature');

// Get All Products
exports.getProducts = async (req, res) => {
    try {
        const resPerPage = 4;
        const productsCount = await Product.countDocuments();
        const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter();
        apiFeatures.pagination(resPerPage);
        const products = await apiFeatures.query;
        let filteredProductsCount = products.length;
        
        if (!products) 
            return res.status(400).json({message: 'error loading products'})
       return res.status(200).json({
            success: true,
            count: productsCount,
            data: products, //donot remove e2ng data:
            filteredProductsCount,
            resPerPage,
           
        })
    
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
