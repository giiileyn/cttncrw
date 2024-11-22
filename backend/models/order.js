const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderItems: [{
      name: String,
      quantity: Number,
      image: String,
      price: Number,
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
    }],
    shippingInfo: {
      address: String,
      city: String,
      phoneNo: String,
      postalCode: String,
      country: String
    },
    itemsPrice: Number,
    totalPrice: Number,
    paidAt: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });
  

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
