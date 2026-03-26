const express = require('express');
const router = express.Router();
const {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuItemsController');

router.get('/', getAllMenuItems);
router.get('/:id', getMenuItemById);
router.post('/', createMenuItem);
router.put(
  '/:id',
  /* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
      name: 'Margherita Pizza',
      category: 'Pizza',
      price: 12.99,
      ingredients: ['tomato sauce', 'mozzarella', 'basil'],
      calories: 800,
      preparationTime: 15,
      available: true
    }
  } */
  updateMenuItem
);
router.delete('/:id', deleteMenuItem);

module.exports = router;