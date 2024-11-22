const Order = require('../models/order');
const Product = require('../models/product');
exports.newOrder = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        console.log("User in request:", req.user);
        console.log("Order Data received:", req.body);
    const userId = req.user.id;
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
        user: req.user.id,
        paidAt: Date.now(),
      
    })

    res.status(200).json({
        success: true,
        order
    });
} catch (error) {
    console.error("Error in newOrder:", error); // Add specific error logging
    res.status(500).json({
        success: false,
        message: "Error creating the order",
        error: error.stack
    });
}
};

// exports.userOrders = async (req, res, next) => {
//     const orders = await Order.find({ user: req.user.id })
//     // console.log(req.user)
//     if (!orders) 
//         return res.status(400).json({message: 'error loading orders'})
//     return res.status(200).json({
//         success: true,
//         orders
//     })
// }

