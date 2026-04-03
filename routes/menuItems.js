const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authenticate');
const {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuItemsController');

router.get('/', getAllMenuItems);
router.get('/:id', getMenuItemById);
router.post('/', isAuthenticated, createMenuItem);
router.put('/:id', isAuthenticated, updateMenuItem);
router.delete('/:id', isAuthenticated, deleteMenuItem);

module.exports = router;