const express = require('express');
const {
  createCashOrder,
  findAllOrders,
  findSpecificOrder,
  filterOrderForLoggedUser,
  updateOrderToPaid,
  updateOrderToDelivered,
  checkoutSession,
} = require('../controllers/orderController');

const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get(
  '/checkout-session/:cartId',
  authController.allowedTo('user'),
  checkoutSession
);

router.route('/:cartId').post(authController.allowedTo('user'), createCashOrder);
router.get(
  '/',
  authController.allowedTo('user', 'admin', 'manager'),
  filterOrderForLoggedUser,
  findAllOrders
);
router.get('/:id', findSpecificOrder);

router.put(
  '/:id/pay',
  authController.allowedTo('admin', 'manager'),
  updateOrderToPaid
);
router.put(
  '/:id/deliver',
  authController.allowedTo('admin', 'manager'),
  updateOrderToDelivered
);

module.exports = router;