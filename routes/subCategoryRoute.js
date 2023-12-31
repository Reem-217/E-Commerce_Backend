const express = require('express');

const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObj,
} = require('../controllers/subCategoryController');
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require('../utils/validators/subCategoryValidator');

const authController = require('../controllers/authController');

// mergeParams: Allow us to access parameters on other routers
// ex: We need to access categoryId from category router
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    authController.protect,
    authController.allowedTo('admin', 'manager'),
    setCategoryIdToBody,
    createSubCategoryValidator,
    createSubCategory
  )
  .get(createFilterObj, getSubCategories);
router
  .route('/:id')
  .get(getSubCategoryValidator, getSubCategory)
  .put(
    authController.protect,
    authController.allowedTo('admin', 'manager'),
    updateSubCategoryValidator,
    updateSubCategory
  )
  .delete(
    authController.protect,
    authController.allowedTo('admin'),
    deleteSubCategoryValidator,
    deleteSubCategory
  );

module.exports = router;