// const authMiddleware = require ('../middleware/authMiddleware');
const express = require('express');
const {newOrder, UserOrders} = require('../controllers/order')
const {isAuthenticatedUser, authorizedRoles} = require ('../middleware/authMiddleware');

const router = express.Router();
router.post('/order/new', isAuthenticatedUser, newOrder);
router.get('/order/me', isAuthenticatedUser, UserOrders);

module.exports = router;
