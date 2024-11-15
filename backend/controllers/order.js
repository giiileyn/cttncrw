const Order = require('../models/order');
const Product = require('../models/product');
exports.newOrder = async (req, res, next) => {
    try {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        totalPrice,
        paymentInfo


    } = req.body;

    const order = await Order.create ({
        orderItems,
        shippingInfo,
        itemsPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id
    })

    res.status(200).json({ success: true, order });
} catch (error) {
    res.status(500).json({ success: false, message: "Order creation failed", error: error.message });
}
}