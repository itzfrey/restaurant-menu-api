const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    ingredients: { type: [String], required: true },
    calories: { type: Number, required: true, min: 0 },
    preparationTime: { type: Number, required: true, min: 1 },
    available: { type: Boolean, default: true }
  },
  { timestamps: true,
    versionKey: false
   }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);