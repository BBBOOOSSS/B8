// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Product = require('../models/product');

// Read all categories with isdelete = false, sorted by order ascending
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isdelete: false }).sort({ order: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read all products for a specific category
router.get('/:categoryId/products', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId, isdelete: false });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update category's isdelete to true
router.patch('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { isdelete: true }, { new: true });
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a category
router.delete('/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
