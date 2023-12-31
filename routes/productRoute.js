const express = require('express');
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require('../utils/validators/productValidator');

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImages,
} = require('../controllers/productController');
const authController = require('../controllers/authController');
const reviewsRoute = require('./reviewRouter');

const router = express.Router();

// POST   /products/jkshjhsdjh2332n/reviews
// GET    /products/jkshjhsdjh2332n/reviews
// GET    /products/jkshjhsdjh2332n/reviews/87487sfww3
router.use('/:productId/reviews', reviewsRoute);

router
  .route('/')
  .get(getProducts)
  .post(
    authController.protect,
    authController.allowedTo('admin', 'manager'),
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  );
router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(
    authController.protect,
    authController.allowedTo('admin', 'manager'),
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct
  )
  .delete(
    authController.protect,
    authController.allowedTo('admin'),
    deleteProductValidator,
    deleteProduct
  );

module.exports = router;