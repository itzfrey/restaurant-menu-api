const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authenticate');
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoriesController');

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', isAuthenticated, createCategory);
router.put('/:id', isAuthenticated, updateCategory);
router.delete('/:id', isAuthenticated, deleteCategory);

module.exports = router;