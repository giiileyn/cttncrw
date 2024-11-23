// const authMiddleware = require ('../middleware/authMiddleware');
const express = require('express');
const {newOrder, UserOrders, adminOrder} = require('../controllers/order')
const {isAuthenticatedUser, authorizedRoles} = require ('../middleware/authMiddleware');

const router = express.Router();
router.post('/order/new', isAuthenticatedUser, newOrder);
router.get('/order/me', isAuthenticatedUser, UserOrders);
router.get('/admin/orders', isAuthenticatedUser, authorizedRoles('admin'),adminOrder);


module.exports = router;
