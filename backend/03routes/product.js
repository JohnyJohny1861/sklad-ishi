const express = require('express');
const productController = require('../02controllers/product');
const isAuth = require('../utils/isAuth');

const router = express.Router();

// Get Products
router.get('/product', productController.getProducts);

// Create Product
router.post('/product', isAuth, productController.createProduct);

// Edit Product
router.put('/product/:id', isAuth, productController.editProduct);

// Get Product
router.get('/product/:id', isAuth, productController.getProduct);

// Delete Product
router.delete('/product/:id', isAuth, productController.deleteProduct);

// Delete Products
router.delete('/product', isAuth, productController.deleteProducts);

module.exports = router;