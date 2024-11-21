const Order = require('../models/order');
const Product = require('../models/product');
exports.newOrder = async (req, res, next) => {
    try {
    const {
        orderItems, shippingInfo, itemsPrice, totalPrice,} = req.body;
    
    if (!orderItems || !shippingInfo || !itemsPrice || !totalPrice) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields'
        });
    }


    const order = await Order.create ({
        orderItems,
        shippingInfo,
        itemsPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user.id
    })

    res.status(200).json({
        success: true,
        order
    });
} catch (error) {
    // Catch any errors and send a failure response
    res.status(500).json({
        success: false,
        message: "Order creation failed",
        error: error.message
    });
}
};