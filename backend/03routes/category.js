const express = require('express');
const categoryController = require('../02controllers/category');
const isAuth = require('../utils/isAuth');

const router = express.Router();

// Get Categorys
router.get('/category', categoryController.getCategorys);

// Create Category
router.post('/category', isAuth, categoryController.createCategory);

// Edit Category
router.put('/category/:id', isAuth, categoryController.editCategory);

// Get Category
router.get('/category/:id', isAuth, categoryController.getCategory);

// Delete Category
router.delete('/category/:id', isAuth, categoryController.deleteCategory);

// Delete Categorys
router.delete('/category', isAuth, categoryController.deleteCategorys);

module.exports = router;