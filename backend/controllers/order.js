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


// exports.updateOrderStatus = async (req, res, next) => {
//     try {
//         const { orderId, status } = req.body;

//         // Validate the status value
//         if (!['processing', 'cancelled', 'delivered'].includes(status)) {
//             return res.status(400).json({ message: 'Invalid status' });
//         }

//         // Ensure the user is an admin
//         if (req.user.role !== 'admin') {
//             return res.status(403).json({ message: 'You are not authorized to update the order status' });
//         }

//         // Find the order and update its status
//         const order = await Order.findById(orderId);
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         // Update the order status
//         order.status = status;
//         await order.save();

//         res.status(200).json({
//             success: true,
//             message: 'Order status updated successfully',
//             order
//         });
//     } catch (error) {
//         console.error('Error updating order status:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error updating the order status',
//             error: error.message
//         });
//     }
// };


exports.UserOrders = async (req, res) => {
    try {
        console.log("Authenticated user ID:", req.user.id); // Add this line to check
        const orders = await Order.find({ user: req.user.id }) // Fetch orders for the logged-in user
            .populate('orderItems.product', 'name price') // Populate the product name and price
            .exec(); // Execute the query

        res.json({ orders });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};



exports.adminOrder = async (req, res) => {
    try {
        // Check if the user has an admin role
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }


        // Fetch all orders and populate related user and product data
        const orders = await Order.find()
            .populate('user', 'name email') // Fetch user name and email
            .populate('orderItems.product', 'name'); // Fetch product names in the order

        // If no orders are found, respond appropriately
        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: 'No orders found' });
        }

        // Respond with all orders
        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};


// exports.UserOrders = async (req, res) => {
//     try {
//         if (!req.user) {
//             return res.status(401).json({ message: 'User not authenticated' });
//         }

//         console.log('User in request:', req.user);

//         // Fetch orders for the authenticated user
//         const orders = await Order.find({ user: req.user.id })
//             .populate({
//                 path: 'orderItems.product',
//                 select: 'name price', // Include necessary fields only
//             });

//         console.log('Orders fetched:', orders);

//         res.status(200).json({
//             success: true,
//             orders,
//         });
//     } catch (err) {
//         console.error('Error fetching user orders:', err);
//         res.status(500).json({
//             success: false,
//             message: 'Server error',
//             error: err.message,
//         });
//     }
// };


