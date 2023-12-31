const express = require('express');

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require('../utils/validators/categoryValidator');

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage,
} = require('../controllers/categoryController');

const authController = require('../controllers/authController');

const subcategoriesRoute = require('./subCategoryRoute');

const router = express.Router();

// Nested route
router.use('/:categoryId/subcategories', subcategoriesRoute);

router
  .route('/')
  .get(getCategories)
  .post(
    authController.protect,
    authController.allowedTo('admin', 'manager'),
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory
  );
router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(
    authController.protect,
    authController.allowedTo('admin', 'manager'),
    uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    updateCategory
  )
  .delete(
    authController.protect,
    authController.allowedTo('admin'),
    deleteCategoryValidator,
    deleteCategory
  );

module.exports = router;