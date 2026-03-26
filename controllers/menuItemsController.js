const MenuItem = require('../models/menuItem');

// GET all menu items
const getAllMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving menu items', error: err.message });
  }
};

// GET single menu item by ID
const getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Menu item not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving menu item', error: err.message });
  }
};

// POST create a menu item
const createMenuItem = async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Error creating menu item', error: err.message });
  }
};

// PUT update a menu item
const updateMenuItem = async (req, res) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Menu item not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error updating menu item', error: err.message });
  }
};

// DELETE a menu item
const deleteMenuItem = async (req, res) => {
  try {
    const deleted = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Menu item not found' });
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting menu item', error: err.message });
  }
};

module.exports = { getAllMenuItems, getMenuItemById, createMenuItem, updateMenuItem, deleteMenuItem };