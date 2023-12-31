const express = require('express');
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require('../utils/validators/brandsValidator');

const authController = require('../controllers/authController');

const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} = require('../controllers/brandsController');

const router = express.Router();

router
  .route('/')
  .get(getBrands)
  .post(
    authController.protect,
    authController.allowedTo('admin', 'manager'),
    uploadBrandImage,
    resizeImage,
    createBrandValidator,
    createBrand
  );
router
  .route('/:id')
  .get(getBrandValidator, getBrand)
  .put(
    authController.protect,
    authController.allowedTo('admin', 'manager'),
    uploadBrandImage,
    resizeImage,
    updateBrandValidator,
    updateBrand
  )
  .delete(
    authController.protect,
    authController.allowedTo('admin'),
    deleteBrandValidator,
    deleteBrand
  );

module.exports = router;