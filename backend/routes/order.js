const authMiddleware = require ('../middleware/authMiddleware.js');
const express = require('express');

const router = express.Router();

const {newOrder } = require('../controllers/order.js')

router.post('/order/new', authMiddleware, newOrder);

module.exports = router;
