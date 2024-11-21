const express = require('express');

const router = express.Router();

const {newOrder, } = require('../controllers/order.js')
router.post('/order/new', newOrder);
module.exports = router;
