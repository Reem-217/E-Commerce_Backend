const express = require('express');

const authController = require('../controllers/authController');

const {
  addAddress,
  removeAddress,
  getLoggedUserAddresses,
} = require('../controllers/addressController');

const router = express.Router();

router.use(authController.protect, authController.allowedTo('user'));

router.route('/').post(addAddress).get(getLoggedUserAddresses);

router.delete('/:addressId', removeAddress);

module.exports = router;